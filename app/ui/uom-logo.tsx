import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function UoMLogo({ title = 'UOM Library' }: { title?: string }) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center  leading-none text-white`}
    >
      <BuildingLibraryIcon className="mb-2 w-12" />
      <p className="text-2xl md:text-4xl">{title}</p>
    </div>
  );
}
