import FileUploadButton from "../components/FileUploadButton/FileUploadButton";

const ImportFile = () => {
  return (
    <main>
      <div className="container-fluid">
        <div className="container">
          <FileUploadButton />
          <p
            className="text-center text-muted mt-3"
            style={{ fontStyle: "italic" }}
          >
            *Only CSV files can be uploaded
          </p>
          <p className="text-center text-muted" style={{ fontStyle: "italic" }}>
            *Location ip-API services are limited to 45 ip's per minute
          </p>
        </div>
      </div>
    </main>
  );
};

export default ImportFile;
