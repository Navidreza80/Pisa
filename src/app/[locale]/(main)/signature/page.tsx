// Third party components
import SignaturePad from '@/components/Signature/Signature';

/**
 * Signature page
 * 
 * @page
 * @route /signature
 * 
 * 
 */

export default function SignaturePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <SignaturePad />
    </div>
  );
};