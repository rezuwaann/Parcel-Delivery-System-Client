import React from 'react';
import { Link } from 'react-router';
import { ShieldAlert } from 'lucide-react';

const Forbidden = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#FAF8FF] px-4'>
            <div className='max-w-md w-full text-center space-y-6'>
                <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F0FE]'>
                    <ShieldAlert className='h-10 w-10 text-[#7C3AED]' />
                </div>

                <div className='space-y-2'>
                    <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                        Error 403
                    </span>
                    <h1 className='text-3xl md:text-4xl font-bold text-[#1E1B2E]'>
                        Access Forbidden
                    </h1>
                    <p className='text-[#6B6478]'>
                        You don't have permission to view this page. If you think this is a
                        mistake, contact an admin.
                    </p>
                </div>

                <Link
                    to='/'
                    className='btn bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white px-8'
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;