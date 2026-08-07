import React from 'react';

const Faq = () => {
    return (
        <div className='text-center space-y-5 flex flex-col justify-center items-center my-10 px-4'>
            <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                FAQ
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">Frequently Asked Questions</h1>
            <h2 className="text-lg text-[#6B6478] max-w-2xl">
                Everything you need to know about sending a parcel, tracking a delivery, and getting support along the way.
            </h2>

            <div className='w-full md:w-9/12 space-y-3'>
                <div className="collapse collapse-arrow bg-white border border-[#EDE9FE]">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold text-[#1E1B2E]">How do I send a parcel?</div>
                    <div className="collapse-content text-sm text-[#6B6478]">Go to "Send A Parcel," fill in the sender and receiver details, choose document or non-document, and confirm the price to book a pickup.</div>
                </div>
                
                <div className="collapse collapse-arrow bg-white border border-[#EDE9FE]">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#1E1B2E]">How is the delivery cost calculated?</div>
                    <div className="collapse-content text-sm text-[#6B6478]">Cost depends on parcel type, weight, and whether the sender and receiver are in the same district. Use the Pricing Calculator to get an instant estimate.</div>
                </div>

                <div className="collapse collapse-arrow bg-white border border-[#EDE9FE]">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#1E1B2E]">🛒 What is the pricing structure?</div>
                    <div className="collapse-content text-sm text-[#6B6478]">
                        <div className='overflow-x-auto mt-2'>
                            <table className='table text-left'>
                                <thead>
                                    <tr className='text-[#6D28D9]'>
                                        <th>Parcel Type</th>
                                        <th>Weight</th>
                                        <th>Within City</th>
                                        <th>Outside City/District</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Document</td>
                                        <td>Any</td>
                                        <td>৳60</td>
                                        <td>৳80</td>
                                    </tr>
                                    <tr>
                                        <td>Non-Document</td>
                                        <td>Up to 3kg</td>
                                        <td>৳110</td>
                                        <td>৳150</td>
                                    </tr>
                                    <tr>
                                        <td>Non-Document</td>
                                        <td>&gt;3kg</td>
                                        <td>+৳40/kg</td>
                                        <td>+৳40/kg +৳40 extra</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white border border-[#EDE9FE]">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#1E1B2E]">Which areas do you deliver to?</div>
                    <div className="collapse-content text-sm text-[#6B6478]">We currently cover all 64 districts. Check the Coverage page and search your district to see the nearest service center.</div>
                </div>
              
            </div>
        </div>
    );
};

export default Faq;