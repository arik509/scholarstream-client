const FAQ = () => {
    const faqs = [
      {
        question: "How do I apply for scholarships?",
        answer: "Browse scholarships, click 'View Details,' then click 'Apply' on the scholarship page. You'll be guided through the payment and application process."
      },
      {
        question: "Are there any application fees?",
        answer: "Some scholarships have application fees while others are free. The fee amount is clearly displayed on each scholarship card."
      },
      {
        question: "How long does the review process take?",
        answer: "Review times vary by scholarship. You can track your application status in your dashboard and receive updates from moderators."
      },
      {
        question: "Can I apply for multiple scholarships?",
        answer: "Yes! You can apply for as many scholarships as you qualify for. Manage all your applications from your student dashboard."
      }
    ];
  
    return (
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Get answers to common questions</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content"> 
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  