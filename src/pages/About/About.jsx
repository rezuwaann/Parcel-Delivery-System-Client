import React from 'react';

const About = () => {
    return (
        <div className='bg-white p-5 md:p-15'>

            <div className='max-w-3xl space-y-5'>
                <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                    About us
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-[#1E1B2E]">
                    Delivery you can <span className='text-[#7C3AED]'>set your clock to</span>
                </h1>
                <p className='text-lg md:text-xl text-[#6B6478]'>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>



            <div className="divider before:bg-[#EDE9FE] after:bg-[#EDE9FE]"></div>
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-lift text-lg">
                <input type="radio" name="about_tabs" className="tab text-lg font-semibold text-[#6B6478] checked:text-[#7C3AED]" aria-label="Story" defaultChecked />
                <div className="tab-content  border-[#EDE9FE] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 text-[#6B6478] leading-relaxed space-y-6 text-lg">
                    <p>
                        We started with a simple promise to make parcel delivery fast, reliable, and stress-free.
                        Over the years, our commitment to real-time tracking, efficient logistics, and customer-first
                        service has made us a trusted partner for thousands.
                    </p>
                    <p>
                        What began as a small operation covering a handful of routes has grown into a network that
                        spans the entire country. Every expansion came from listening to what merchants and
                        customers actually needed, not from chasing growth for its own sake. We turned down
                        shortcuts that would have gotten us bigger faster, because reliability was never something
                        we were willing to trade away for speed of growth.
                    </p>
                    <p>
                        Along the way we rebuilt our routing system twice, switched warehouse partners when the
                        first ones couldn't keep pace with demand, and spent an uncomfortable amount of time
                        arguing internally about what "on time" should actually mean for a customer waiting on a
                        package. Those arguments shaped almost everything about how we operate today.
                    </p>
                    <p>
                        Today, whether it's a personal gift or a time-sensitive business delivery, we ensure it
                        reaches its destination on time, every time. That's not a slogan we picked for a website;
                        it's the standard our operations team gets held to every single day.
                    </p>
                </div>

                <input type="radio" name="about_tabs" className="tab text-lg font-semibold text-[#6B6478] checked:text-[#7C3AED]" aria-label="Mission" />
                <div className="tab-content  border-[#EDE9FE] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 text-[#6B6478] leading-relaxed space-y-6 text-lg">
                    <p>
                        Our mission is to close the gap between businesses and their customers by making delivery
                        something people can actually rely on. We're building the logistics backbone that lets
                        small sellers compete with anyone same coverage, same speed, same peace of mind, no
                        matter the size of the operation behind it.
                    </p>
                    <p>
                        We believe reliable delivery shouldn't be a luxury reserved for large companies with their
                        own fleets. Every business, from a solo seller shipping from home to an established brand
                        with thousands of monthly orders, deserves the same dependable infrastructure. That belief
                        is why we built a flat, transparent pricing structure instead of the tiered systems that
                        quietly punish smaller merchants for not shipping enough volume.
                    </p>
                    <p>
                        We also think delivery infrastructure shouldn't be a black box. Sellers and customers alike
                        should be able to see exactly where a parcel is, why a delay happened if one does, and who
                        to talk to if something goes wrong without having to dig through a support ticket queue
                        to get a straight answer.
                    </p>
                    <p>
                        Every route we optimize and every driver we onboard is in service of one thing: fewer
                        delays, fewer surprises, and a parcel that shows up exactly where and when it's supposed to.
                    </p>
                </div>

                <input type="radio" name="about_tabs" className="tab text-lg font-semibold text-[#6B6478] checked:text-[#7C3AED]" aria-label="Success" />
                <div className="tab-content  border-[#EDE9FE] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 text-[#6B6478] leading-relaxed space-y-6 text-lg">
                    <p>
                        Since launch, we've expanded coverage to all 64 districts, partnered with hundreds of
                        merchants, and delivered parcels that range from documents to full pallets. Our on-time
                        delivery rate has stayed above 98%, and it's climbing as our network matures.
                    </p>
                    <p>
                        We've handled peak-season surges without missing a beat, built dedicated support for
                        high-volume sellers, and kept costs predictable even as fuel prices and demand have
                        fluctuated. Consistency, not just speed, is what we measure ourselves against a driver
                        arriving exactly when promised matters more to most customers than arriving five minutes
                        earlier than expected.
                    </p>
                    <p>
                        Some of what we count as success doesn't show up in a headline number. It's the merchant who
                        stopped worrying about delivery complaints and started focusing on their product again.
                        It's the customer who didn't have to call support because the tracking page actually told
                        them the truth. Those are harder to put on a dashboard, but they're the reason people stick
                        with us.
                    </p>
                    <p>
                        None of that happens by accident. It's the result of a logistics system built to scale
                        without sacrificing the reliability that got us here in the first place.
                    </p>
                </div>

                <input type="radio" name="about_tabs" className="tab text-lg font-semibold text-[#6B6478] checked:text-[#7C3AED]" aria-label="Team & Others" />
                <div className="tab-content  border-[#EDE9FE] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 text-[#6B6478] leading-relaxed space-y-6 text-lg">
                    <p>
                        Behind every delivery is a team that treats logistics like a craft dispatchers who know
                        the routes better than any map, drivers who've become familiar faces in the neighborhoods
                        they serve, and a support team that actually picks up the phone.
                    </p>
                    <p>
                        Our operations staff work early mornings and late nights to make sure routes are optimized
                        before the first parcel leaves the warehouse. It's unglamorous work, but it's the reason
                        deliveries that look effortless from the outside actually arrive on time. Behind the scenes
                        there's a lot of recalculating when a road is blocked, a lot of phone calls when an address
                        doesn't match what's on the label, and a lot of small decisions nobody sees.
                    </p>
                    <p>
                        We've also built a culture where drivers are treated as the front line of the company, not
                        an afterthought. They're the ones a customer actually meets, and their judgment on the
                        ground knowing which building entrance actually works, which hours a shop is really open —
                        solves more delivery problems than any algorithm we've written.
                    </p>
                    <p>
                        We're not just moving parcels. We're building relationships with the merchants and
                        customers who trust us with something that matters to them, one delivery at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;