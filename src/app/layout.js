import './globals.css';

export const metadata = {
  title: 'Nikhil Kudale | Full Stack & Generative AI Engineer',
  description: 'Professional portfolio of Nikhil Kudale, a Full-Stack & AI Software Developer specializing in Java Spring Boot, LLMs, LangChain RAG integrations, and React/Next.js interfaces.',
  keywords: ['Nikhil Kudale', 'Software Engineer', 'Java Developer', 'Spring Boot', 'React Developer', 'Generative AI Developer', 'RAG Engineer', 'LangChain', 'Full Stack Portfolio'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
