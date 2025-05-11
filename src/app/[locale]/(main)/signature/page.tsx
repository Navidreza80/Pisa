import SignaturePad from '@/components/Signature/Signature';

const SignaturePage = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          امضا بزن
        </h1>
        <SignaturePad />
      </div>
    </div>
  );
};

export default SignaturePage;