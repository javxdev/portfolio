// Assets
import frontendEngineering from '../assets/images/frontend_engineering.webp';
import motionCreativeDev from '../assets/images/motion_creative_dev.webp';
import uiCraftDesignSystems from '../assets/images/ui_craft_design_systems.webp';
import toolingWorkflow from '../assets/images/tooling_workflow.webp';
import apiIntegration from '../assets/images/API_integration.webp';
import collaboration from '../assets/images/collaboration.webp';
import webMobileProducts from '../assets/images/wonderkids-app-icon.webp';

export interface Skill {
  title: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const skills: Skill[] = [
  {
    title: 'Frontend Engineering',
    image: frontendEngineering,
    tagline: 'Fast. Scalable. Bulletproof.',
    description:
      'Frontend systems teams rely on to ship quickly, scale safely, and stay stable in production.',
    highlights: [
      'Consistently delivering sub-second experiences',
      'Architectures that scale without rewrites',
      'Production stability teams can depend on'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Vite']
  },
  {
    title: 'Motion & Interaction',
    image: motionCreativeDev,
    tagline: 'Fluid. Memorable. Intentional.',
    description:
      'Purposeful motion that guides users, reinforces feedback, and enhances UX without hurting performance.',
    highlights: [
      'Smooth 60fps animations across devices',
      'Gesture-driven interactions that feel natural',
      'Accessibility-aware motion design'
    ],
    technologies: ['Framer Motion', 'GSAP', 'React Spring', 'CSS Animations']
  },
  {
    title: 'Design Systems',
    image: uiCraftDesignSystems,
    tagline: 'Consistent. Flexible. Team-Ready.',
    description:
      'Design systems that help teams move faster while keeping UI consistent and maintainable at scale.',
    highlights: [
      'Themeable components with minimal runtime cost',
      'Clear documentation via Storybook',
      'Adopted and maintained by growing teams'
    ],
    technologies: ['Storybook', 'CSS Modules', 'Tailwind', 'Radix UI']
  },
  {
    title: 'API & Integration',
    image: apiIntegration,
    tagline: 'Connected. Reliable. Seamless.',
    description:
      'Reliable data integration between frontends and backend services, built for real-world edge cases.',
    highlights: [
      'Real-time updates and async data flows',
      'Smart caching and background synchronization',
      'Graceful failure handling in poor network conditions'
    ],
    technologies: ['React Query', 'GraphQL', 'WebSockets', 'tRPC']
  },
  {
    title: 'Developer Workflow',
    image: toolingWorkflow,
    tagline: 'Efficient. Modern. Production-Grade.',
    description:
      'Workflows and pipelines that keep teams shipping safely, consistently, and with confidence.',
    highlights: [
      'Automated testing with meaningful coverage',
      'Pre-commit safeguards that prevent regressions',
      'Preview deployments for faster feedback loops'
    ],
    technologies: ['Vitest', 'ESLint', 'Prettier', 'GitHub Actions']
  },
  {
    title: 'Technical Collaboration',
    image: collaboration,
    tagline: 'Clear. Responsive. Professional.',
    description:
      'Strong communication, thoughtful code reviews, and documentation that keeps teams aligned.',
    highlights: [
      'Documentation that lowers onboarding friction',
      'Code reviews focused on quality and learning',
      'Async-first collaboration across timezones'
    ],
    technologies: ['Figma', 'Linear', 'Notion', 'Loom']
  },
  {
    title: 'Web & Mobile Products',
    image: webMobileProducts,
    tagline: 'Cross-Platform. User-Focused. Reliable.',
    description:
      'End-to-end delivery of web and mobile products, from internal tools to customer-facing applications.',
    highlights: [
      'Shared logic across web and mobile platforms',
      'Production-ready React Native and Flutter apps',
      'Consistent behavior across devices and environments'
    ],
    technologies: ['React Native', 'Flutter', 'Dart', 'React']
  }
];