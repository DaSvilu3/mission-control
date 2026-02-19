import { Agent, Task } from '../types';

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Forge',
    role: 'BUILDER',
    currentTask: 'Building Sijil ERP Mobile App',
    status: 'active',
    lastSeen: '2 min ago'
  },
  {
    id: '2',
    name: 'Scout',
    role: 'RESEARCHER',
    currentTask: 'Analyzing GCC market trends',
    status: 'active',
    lastSeen: '5 min ago'
  },
  {
    id: '3',
    name: 'Ghost',
    role: 'WRITER',
    currentTask: 'Drafting product documentation',
    status: 'active',
    lastSeen: '1 min ago'
  },
  {
    id: '4',
    name: 'Closer',
    role: 'SALES',
    currentTask: 'Following up with Bank Muscat',
    status: 'idle',
    lastSeen: '12 min ago'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Build Sijil ERP Mobile App',
    description: 'Develop the mobile application for the Sijil ERP system with React Native',
    priority: 'P0',
    status: 'IN_PROGRESS',
    assignedAgent: 'Forge',
    timestamp: '2024-02-19T10:30:00Z'
  },
  {
    id: '2',
    title: 'Research GCC market competitors',
    description: 'Comprehensive analysis of competing ERP solutions in the GCC region',
    priority: 'P1',
    status: 'REVIEW',
    assignedAgent: 'Scout',
    timestamp: '2024-02-19T09:15:00Z'
  },
  {
    id: '3',
    title: 'Write product documentation',
    description: 'Create comprehensive user guides and technical documentation',
    priority: 'P1',
    status: 'IN_PROGRESS',
    assignedAgent: 'Ghost',
    timestamp: '2024-02-19T11:00:00Z'
  },
  {
    id: '4',
    title: 'Client outreach — Bank Muscat',
    description: 'Schedule demo and negotiate contract terms with Bank Muscat',
    priority: 'P0',
    status: 'REVIEW',
    assignedAgent: 'Closer',
    timestamp: '2024-02-19T08:45:00Z'
  },
  {
    id: '5',
    title: 'Deploy API to production',
    description: 'Set up production environment and deploy the latest API version',
    priority: 'P0',
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-02-18T16:30:00Z'
  },
  {
    id: '6',
    title: 'SEO content strategy',
    description: 'Develop content strategy and optimize website for search engines',
    priority: 'P2',
    status: 'DONE',
    assignedAgent: 'Ghost',
    timestamp: '2024-02-18T14:20:00Z'
  },
  {
    id: '7',
    title: 'Database optimization',
    description: 'Improve query performance and optimize database indices',
    priority: 'P1',
    status: 'IN_PROGRESS',
    assignedAgent: 'Forge',
    timestamp: '2024-02-19T12:15:00Z'
  },
  {
    id: '8',
    title: 'User feedback analysis',
    description: 'Analyze customer feedback and identify improvement areas',
    priority: 'P2',
    status: 'REVIEW',
    assignedAgent: 'Scout',
    timestamp: '2024-02-19T10:00:00Z'
  },
  {
    id: '9',
    title: 'Mobile app testing',
    description: 'Comprehensive testing of the mobile application across devices',
    priority: 'P1',
    status: 'IN_PROGRESS',
    assignedAgent: 'Forge',
    timestamp: '2024-02-19T13:30:00Z'
  },
  {
    id: '10',
    title: 'Security audit report',
    description: 'Complete security assessment and vulnerability analysis',
    priority: 'P0',
    status: 'DONE',
    assignedAgent: 'Scout',
    timestamp: '2024-02-18T11:45:00Z'
  },
  {
    id: '11',
    title: 'API documentation update',
    description: 'Update API docs with latest endpoints and examples',
    priority: 'P2',
    status: 'DONE',
    assignedAgent: 'Ghost',
    timestamp: '2024-02-18T15:00:00Z'
  },
  {
    id: '12',
    title: 'Customer onboarding flow',
    description: 'Design and implement streamlined onboarding experience',
    priority: 'P1',
    status: 'IN_PROGRESS',
    assignedAgent: 'Ghost',
    timestamp: '2024-02-19T09:30:00Z'
  },
  {
    id: '13',
    title: 'Sales pipeline optimization',
    description: 'Analyze and improve the current sales process efficiency',
    priority: 'P1',
    status: 'REVIEW',
    assignedAgent: 'Closer',
    timestamp: '2024-02-19T11:45:00Z'
  },
  {
    id: '14',
    title: 'Cloud infrastructure setup',
    description: 'Configure scalable cloud infrastructure for production',
    priority: 'P0',
    status: 'DONE',
    assignedAgent: 'Forge',
    timestamp: '2024-02-18T13:20:00Z'
  }
];