
const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[32px] font-semibold text-white mb-2">{title}</h1>
        <p className="text-[#A1A1A1] text-base font-normal">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
