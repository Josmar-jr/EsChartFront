import { useState } from 'react';
import { uuid } from 'uuidv4';
import fileSize from 'filesize';

import { Layout } from '../components/Layout';
import { Upload } from '../components/Upload';
import { FileList } from '../components/Upload/FileList';
import { withSSRAuth } from '../utils/withSSRAuth';

type File = {
  path: string;
  name: string;
  size: number;
  type: string;
  lastModifiedDate: Date;
};

export type UploadedFilesType = {
  file: string;
  id: string;
  error: boolean;
  name: string;
  progress: number;
  readableSize: string;
  uploaded: boolean;
  url?: string;
};

export default function Register() {
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadedFilesType[] | any[]
  >([]);

  function handleUploadFiles(files: File[]) {
    const uploadedListFiles = files.map(file => ({
      file,
      id: uuid(),
      name: file.name,
      readableSize: fileSize(file.size),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFiles(oldState => [...oldState, ...uploadedListFiles]);

    uploadedFiles.forEach(processUpload);
  }

  function updateFile(id: string, data: any) {
    setUploadedFiles(allUploaded =>
      allUploaded.map((updateFile: UploadedFilesType) => {
        console.log({ ...updateFile, ...data });

        return id === updateFile.id ? { ...updateFile, ...data } : updateFile;
      })
    );
  }

  async function processUpload(uploadedFile: UploadedFilesType) {
    try {
      const data = new FormData();

      data.append('file', uploadedFile.file, uploadedFile.name);

      const response = await new Promise(resolve => setTimeout(resolve, 1000));

      updateFile(uploadedFile.id, {
        uploaded: true,
        id: uploadedFile.id,
        url: 'New URL'
      });
    } catch (error) {
      console.error(`# This is error in process upload: ${error}`);
    }
  }

  return (
    <Layout>
      <section className="max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-bold">Cadastro de arquivos de leitura</h1>
        <p className="text-slate-500">
          Faça upload de arquivos CSV para gerar registros gráficos
        </p>
        <div className="my-8">
          <Upload onUpload={handleUploadFiles} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
});
