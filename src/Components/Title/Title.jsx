const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-xl mx-auto my-8">
      {subtitle && (
        <p className="text-xs text-muted mb-1">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default Title;
