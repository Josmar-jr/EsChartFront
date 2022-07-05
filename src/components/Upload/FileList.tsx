import Link from 'next/link';

import {
  CheckCircle,
  CircleNotch,
  FileCsv,
  Link as IconLink,
  WarningCircle
} from 'phosphor-react';

import { UploadedFilesType } from '../../pages/register';

export function FileList({ files }: UploadedFilesType | any) {
  return (
    <ul className="flex flex-col gap-2 pt-8">
      {files.map((uploadFile: UploadedFilesType) => (
        <li
          key={uploadFile.id}
          className="flex justify-between items-center p-2 bg-white shadow-lg rounded-md text-sm"
        >
          <div className="flex items-center gap-2">
            <FileCsv size={28} color="#202124" weight="bold" />

            <span>
              <strong className="text-slate-800">{uploadFile.name}</strong>
              <span className="text-xs flex gap-2 text-slate-500">
                {uploadFile.readableSize}{' '}
                <button onClick={() => {}} className="text-red-500 font-medium">
                  Excluir
                </button>
              </span>
            </span>
          </div>

          <div className="flex gap-2">
            {!uploadFile.uploaded && !uploadFile.error && (
              <CircleNotch
                className="animate-spin text-primary"
                size={20}
                weight="bold"
              />
            )}

            {uploadFile.url && (
              <Link href="" target="_blank" rel="noopener noreferrer">
                <a>
                  <IconLink size={20} weight="bold" />
                </a>
              </Link>
            )}

            {uploadFile.uploaded && (
              <CheckCircle size={20} weight="bold" className="text-green-500" />
            )}

            {uploadFile.error && (
              <WarningCircle size={20} weight="bold" className="text-red-500" />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
