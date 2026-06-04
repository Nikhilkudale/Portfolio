import './globals.css';

export const metadata = {
  title: 'Nikhil Kudale | Full Stack Engineer & Spring Boot Architect',
  description: 'Professional portfolio of Nikhil Kudale, a Full-Stack Software Developer specializing in Java, Spring Boot, Spring Security, REST APIs, and React/Next.js interfaces.',
  keywords: ['Nikhil Kudale', 'Software Engineer', 'Java Developer', 'Spring Boot', 'React Developer', 'Full Stack Portfolio'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
