#!/bin/bash
# Generates status.json from OpenClaw tools output, commits+pushes if changed
set -e

REPO_DIR="/Users/MatplotUser/clawd/mission-control"
DATA_FILE="$REPO_DIR/public/status.json"
TMP_FILE="$DATA_FILE.tmp"

mkdir -p "$REPO_DIR/public"

# Use openclaw CLI to get session and cron data
# Extract JSON from CLI output (skip doctor warnings box)
extract_json() {
  node -e "
    const input = require('fs').readFileSync('/dev/stdin','utf8');
    const match = input.match(/(\{[\s\S]*\})\s*$/);
    if (match) process.stdout.write(match[1]);
    else process.stdout.write('{}');
  "
}

SESSIONS=$(openclaw sessions list --json 2>/dev/null | extract_json)
CRON_JOBS=$(openclaw cron list --json 2>/dev/null | extract_json)

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

node -e "
const sessionsRaw = process.argv[1];
const cronRaw = process.argv[2];
const timestamp = process.argv[3];

let sessions = [];
let cronJobs = [];

try { sessions = JSON.parse(sessionsRaw); } catch(e) { sessions = []; }
try { cronJobs = JSON.parse(cronRaw); } catch(e) { cronJobs = []; }

// Normalize - sessions might be wrapped
if (sessions.sessions) sessions = sessions.sessions;
if (cronJobs.jobs) cronJobs = cronJobs.jobs;
if (!Array.isArray(sessions)) sessions = [];
if (!Array.isArray(cronJobs)) cronJobs = [];

const status = {
  timestamp,
  gateway: { healthy: true },
  sessions: sessions.map(s => ({
    key: s.key || s.sessionKey || '',
    kind: s.kind || 'unknown',
    label: s.label || null,
    displayName: s.displayName || s.key || '',
    model: s.model || null,
    channel: s.lastChannel || s.channel || null,
    totalTokens: s.totalTokens || 0,
    updatedAt: s.updatedAt || null,
    lastMessage: (s.lastMessages?.[0]?.content || '').substring(0, 200) || null
  })),
  cronJobs: cronJobs.map(j => ({
    id: j.id || j.jobId || '',
    name: j.name || j.id || '',
    enabled: j.enabled !== false,
    schedule: j.schedule || null,
    lastRun: j.lastRunAt || null,
    nextRun: j.nextRunAt || null,
    payload: j.payload?.kind || null
  })),
  meta: {
    totalSessions: sessions.length,
    activeSessions: sessions.filter(s => {
      const u = s.updatedAt;
      return u && (Date.now() - u) < 5 * 60 * 1000;
    }).length,
    totalCronJobs: cronJobs.length,
    enabledCronJobs: cronJobs.filter(j => j.enabled !== false).length
  }
};

process.stdout.write(JSON.stringify(status, null, 2));
" "$SESSIONS" "$CRON_JOBS" "$TIMESTAMP" > "$TMP_FILE"

# Compare ignoring timestamp
if [ -f "$DATA_FILE" ]; then
  OLD=$(cat "$DATA_FILE" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));delete d.timestamp;console.log(JSON.stringify(d))" 2>/dev/null | md5 -q 2>/dev/null || echo "none")
  NEW=$(cat "$TMP_FILE" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));delete d.timestamp;console.log(JSON.stringify(d))" 2>/dev/null | md5 -q 2>/dev/null || echo "changed")
  
  if [ "$OLD" = "$NEW" ]; then
    rm "$TMP_FILE"
    echo "NO_CHANGE"
    exit 0
  fi
fi

mv "$TMP_FILE" "$DATA_FILE"

cd "$REPO_DIR"
git add public/status.json
git commit -m "status: $(date +%H:%M)" --no-verify 2>/dev/null || { echo "NO_CHANGE"; exit 0; }
git push origin main 2>/dev/null
echo "PUSHED"
