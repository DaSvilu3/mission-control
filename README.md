# Mission Control Dashboard

A modern, dark-themed dashboard for monitoring agents and managing tasks in real-time.

## Features

### 🤖 Agent Monitoring
- **Agent Cards**: Display active agents with their current status
- **Real-time Status**: Visual indicators for active/idle agents
- **Role-based Display**: Color-coded roles (BUILDER, RESEARCHER, WRITER, SALES)
- **Last Seen Tracking**: Shows when each agent was last active

### 📋 Task Management
- **Kanban Board**: Three-column layout (IN PROGRESS, REVIEW, DONE)
- **Priority System**: Color-coded priority badges (P0 red, P1 orange, P2 blue)  
- **Task Assignment**: Shows which agent is working on each task
- **Timestamp Tracking**: Smart relative time display
- **Task Descriptions**: Brief summaries of each task

### 🎨 Design
- **Dark Theme**: Professional dark background (#1a1a2e)
- **Green Accents**: Highlights for active states
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Clean Typography**: Easy-to-read fonts and proper spacing
- **Hover Effects**: Subtle interactions for better UX

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mission-control
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
```

The build generates optimized static files ready for deployment.

### Deployment

This project is configured for easy deployment to Vercel:

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically with zero configuration

Or deploy directly:
```bash
vercel deploy
```

## Project Structure

```
mission-control/
├── app/
│   ├── components/          # React components
│   │   ├── AgentCard.tsx   # Agent status cards
│   │   ├── TaskCard.tsx    # Individual task cards  
│   │   ├── KanbanBoard.tsx # Task board layout
│   │   └── Dashboard.tsx   # Main dashboard
│   ├── data/               # Mock data
│   │   └── mockData.ts     # Agents and tasks
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type definitions
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── vercel.json            # Vercel configuration
└── README.md             # This file
```

## Data Structure

### Agents
Each agent has:
- `id`: Unique identifier
- `name`: Agent name (e.g., "Forge", "Scout")
- `role`: Agent type (BUILDER, RESEARCHER, WRITER, SALES)
- `currentTask`: What they're currently working on
- `status`: Active or idle state
- `lastSeen`: When they were last active

### Tasks  
Each task includes:
- `id`: Unique identifier
- `title`: Task name
- `description`: Brief summary
- `priority`: P0 (critical), P1 (high), P2 (normal)
- `status`: IN_PROGRESS, REVIEW, or DONE
- `assignedAgent`: Which agent is working on it
- `timestamp`: When the task was created/updated

## Customization

### Adding New Agents
Edit `app/data/mockData.ts` and add agents to the `agents` array.

### Adding New Tasks
Add tasks to the `tasks` array in `app/data/mockData.ts`.

### Styling Changes
Modify `app/globals.css` or component-specific Tailwind classes.

### Color Scheme
The dark theme uses these key colors:
- Background: `#1a1a2e`
- Cards: `#374151` (gray-700)
- Borders: `#4b5563` (gray-600)
- Text: White/gray variants
- Accents: Green for active states

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js 14 and Tailwind CSS