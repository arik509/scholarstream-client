import { useLocation, Link } from 'react-router';

const PaymentFailed = () => {
  const location = useLocation();
  const { scholarship, error } = location.state || {};

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">No payment data found</h2>
          <Link to="/scholarships" className="btn btn-primary mt-4">
            Back to Scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-4xl font-bold text-error mb-4">Payment Failed</h1>
          
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Your application has been saved but payment is pending.
          </p>

          <div className="divider"></div>

          <div className="space-y-3 text-left">
            <div className="flex justify-between p-3 bg-base-200 rounded-lg">
              <span className="font-semibold">Scholarship:</span>
              <span>{scholarship.scholarshipName}</span>
            </div>

            <div className="flex justify-between p-3 bg-base-200 rounded-lg">
              <span className="font-semibold">University:</span>
              <span>{scholarship.universityName}</span>
            </div>

            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error || 'Payment processing failed. Please try again.'}</span>
            </div>
          </div>

          <div className="card-actions justify-center mt-6">
            <Link to="/dashboard/my-applications" className="btn btn-primary">
              Go to Dashboard to Retry
            </Link>
            <Link to="/scholarships" className="btn btn-ghost">
              Browse Scholarships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
