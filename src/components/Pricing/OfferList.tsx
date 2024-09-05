import Image from 'next/image'
const OfferList = ({ text }: { text: string }) => {
  return (
    <div className='flex gap-1'>
      <Image src="green-check.svg" width={20} height={20} alt='green-check' className='h-fit mt-1' />
      <p className={`mb-1 text-base text-body-color dark:text-dark-6`}>
        {text}
      </p>
    </div>
  );
};

export default OfferList;
