export default function SectionWrapper({ children, className = '' }) {
    return (
      <section className={`py-12 px-6 lg:px-24 ${className}`}>
        {children}
      </section>
    );
  }
  