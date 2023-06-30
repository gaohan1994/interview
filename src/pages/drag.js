import React from "react";

function DragPage() {
  const [files, setFiles] = React.useState([]);
  const ref = React.useRef();

  const onDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log("onDragEnter event", event);
  };

  const onDragEnd = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log("onDragEnd event", event);
  };

  const onDrop = event => {
    console.log("on drop event ", event);
    event.stopPropagation();
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    console.log("dataTransfer", dataTransfer);

    const files = dataTransfer.files;
    console.log("files", files);

    setFiles(files);
  };

  return (
    <div
      className="drag-content"
      ref={ref}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      {files.length > 0
        ? files.map((file, index) => <span key={`${file.name}-${index}`}>{file.name}</span>)
        : `Drop files here`}
    </div>
  );
}

export { DragPage };
