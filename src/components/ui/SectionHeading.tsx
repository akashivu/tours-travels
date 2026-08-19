interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({
  title,
  subtitle,
}: SectionHeadingProps) => {
  return (
    <div className="mb-14 max-w-3xl">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;