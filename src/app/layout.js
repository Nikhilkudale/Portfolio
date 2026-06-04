import './globals.css';

export const metadata = {
  title: 'Nikhil Kudale | Full Stack & Generative AI Engineer',
  description: 'Professional portfolio of Nikhil Kudale, a Full-Stack & AI Software Developer specializing in Java Spring Boot, LLMs, LangChain RAG integrations, and React/Next.js interfaces.',
  keywords: ['Nikhil Kudale', 'Software Engineer', 'Java Developer', 'Spring Boot', 'React Developer', 'Generative AI Developer', 'RAG Engineer', 'LangChain', 'Full Stack Portfolio'],
  verification: {
    google: '_5Io0TBW_j5W4NpNv2bV1S0hEns_sGkFvx-ZWFyZLrQ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="_5Io0TBW_j5W4NpNv2bV1S0hEns_sGkFvx-ZWFyZLrQ" />
      </head>
      <body>{children}</body>
    </html>
  );
}
