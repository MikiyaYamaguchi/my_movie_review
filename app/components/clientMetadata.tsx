type ClientMetadataProps = {
  title: string;
  description: string;
};

const ClientMetadata = ({ title, description }: ClientMetadataProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};

export default ClientMetadata;
