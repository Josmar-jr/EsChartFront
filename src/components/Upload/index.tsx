import { FolderOpen } from 'phosphor-react';
import Dropzone from 'react-dropzone';

export function Upload({ onUpload }) {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <p>Arraste arquivos aqui...</p>;
    }

    if (isDragReject) {
      return <p>Arquivo não suportado</p>;
    }

    return <p>Solte os arquivos aqui</p>;
  }

  return (
    <Dropzone
      accept={{
        'text/csv': [
          '.csv',
          '.xls',
          '.xlsx',
          'text/csv',
          'application/csv',
          'text/comma-separated-values',
          'application/csv',
          'application/excel',
          'application/vnd.msexcel',
          'text/anytext',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
      }}
      onDropAccepted={onUpload}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div
          {...getRootProps()}
          className={`${isDragActive && 'outline-slate-500'} ${
            isDragReject && 'outline-red-400'
          } ${
            isDragActive && 'bg-blueOpacity'
          } outline-primary outline-dashed text-center outline-2 outline-offset-2 rounded-md cursor-pointer transition-[height] duration-200 ease-in`}
        >
          <input type="file" {...getInputProps()} />
          <div className="flex flex-col text-slate-500 items-center justify-center py-16">
            <FolderOpen size={36} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        </div>
      )}
    </Dropzone>
  );
}
