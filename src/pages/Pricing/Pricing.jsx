import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const Pricing = () => {

    const { register,
        handleSubmit,
        watch
    } = useForm();

    const senderRegion = watch('senderRegion');
    const recieverRegion = watch('recieverRegion');
    const regionsData = useLoaderData()
    const regionsALL = regionsData.map(r => r.region)
    const regions = [...new Set(regionsALL)]

    const [cost, setCost] = useState(0);

    const handleSendParcel = (data) => {
        console.log(data)
        let c = 0;
        const parcelType = data.parcelType;
        const sameDistrict = data.senderRegion == data.recieverRegion;
        const parcelWeight = parseFloat(data.parcelWeight)

if (data.parcelWeight==0||data.senderRegion=='Select Your District'||data.recieverRegion=='Select Your District') {
    return;
}else if (isNaN(parcelWeight)) {
    return;
}

        if (parcelType == 'document') {
            c = sameDistrict ? 60 : 80;
        } else {
            if (parcelWeight <= 3) {
                c = sameDistrict ? 110 : 150;
            } else {
                const minimumCost = sameDistrict ? 110 : 150;
                const remainingWeights = parcelWeight - 3;
                const extraCost = minimumCost + (remainingWeights * 40)
                minimumCost + (remainingWeights * 40);
                c = sameDistrict ? extraCost : extraCost + 40;
            }

        }
        setCost(c)
        console.log('cost = ', cost);
        console.log(sameDistrict, parcelWeight)
    }

    return (
        <div className='rounded-3xl shadow-lg border border-[#EDE9FE] p-5 md:p-10 bg-white max-w-5xl mx-auto'>
            <div className='space-y-3'>
                <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                    Pricing calculator
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-[#1E1B2E]">Know your cost upfront</h1>
                <h2 className='text-[#6B6478] text-lg'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</h2>
            </div>

            <div className="divider before:bg-[#EDE9FE] after:bg-[#EDE9FE] my-8"></div>

            <div className='space-y-6'>
                <h1 className="text-2xl md:text-3xl text-center font-bold text-[#1E1B2E]">Calculate Your Cost</h1>

                <div className='flex gap-6 flex-col md:flex-row'>

                    <div className='w-full  border border-[#EDE9FE] rounded-2xl p-5 md:p-6'>
                        <form onSubmit={handleSubmit(handleSendParcel)} className='space-y-5'>

                            <h2 className="text-xl font-bold text-[#1E1B2E]">Enter your parcel details</h2>

                            <div className='flex flex-col sm:flex-row gap-3'>
                                <label className='flex-1 flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C4B5FD] transition-colors'>
                                    <input type="radio" name="radio-4" {...register('parcelType')} value='document' className="radio radio-sm text-[#7C3AED] [--radio-color:#7C3AED]" defaultChecked />
                                    <span className='font-medium text-[#1E1B2E]'>Document</span>
                                </label>

                                <label className='flex-1 flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 cursor-pointer hover:border-[#C4B5FD] transition-colors'>
                                    <input type="radio" name="radio-4"  {...register('parcelType')} value='non-document' className="radio radio-sm text-[#7C3AED] [--radio-color:#7C3AED]" />
                                    <span className='font-medium text-[#1E1B2E]'>Non Document</span>
                                </label>
                            </div>

                            <fieldset className="fieldset w-full">
                                <label className="text-sm font-semibold text-[#1E1B2E] label">Your Division</label>
                                <select defaultValue="Select Your District" {...register('senderRegion')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                    <option disabled={true} >Select Your District</option>


                                    {
                                        regions.map((district, index) => <option key={index} value={district}>{district}</option>)
                                    }
                                </select>
                            </fieldset>



                            <fieldset className="fieldset w-full">
                                <label className="text-sm font-semibold text-[#1E1B2E] label">Reciever's Division</label>


                                <select defaultValue="Select Your District" {...register('recieverRegion')} className="select w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] text-gray-600">
                                    <option disabled={true} >Select Your District</option>


                                    {
                                        regions.map((district, index) => <option key={index} value={district}>{district}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <label className="text-sm font-semibold text-[#1E1B2E] label">Parcel Weight (KG)</label>
                                <input type="number" className="input w-full bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]" step='0.01' {...register('parcelWeight', { valueAsNumber: true })} placeholder="Parcel Weight" />
                            </fieldset>


                          <div className='flex gap-3 pt-2'>
                              <button type='button' onClick={()=>setCost(0)} className="btn bg-white border border-[#7C3AED] text-[#7C3AED] hover:bg-[#EDE9FE] w-2/6 text-lg">
                                Reset
                            </button>


                            <button type='submit' className="btn bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white w-4/6 text-lg">
                                Calculate
                            </button>
                          </div>
                        </form>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 w-full  rounded-2xl p-8 text-center'>
                        <span className=' text-sm font-semibold uppercase tracking-widest'>Estimated cost</span>
                        <div className='flex items-end gap-2'>
                            <span className='text-6xl md:text-8xl font-bold '>{cost}</span>
                            <span className='text-2xl md:text-3xl font-semibold  mb-2'>TK</span>
                        </div>
                        <p className='text-sm max-w-xs'>Fill in the details and hit calculate to see your delivery cost.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;