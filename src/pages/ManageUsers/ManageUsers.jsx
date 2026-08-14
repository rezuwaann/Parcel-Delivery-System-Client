import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Users, Search, ShieldCheck, ShieldOff, CalendarDays } from 'lucide-react';
import Swal from 'sweetalert2';

const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

const ROLE_FILTERS = ['All', 'User', 'Rider', 'Admin'];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    const filteredUsers = users.filter((u) => {
        const query = search.toLowerCase();
        const matchesSearch =
            u.displayName?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query);

        const matchesRole =
            roleFilter === 'All' || u.role?.toLowerCase() === roleFilter.toLowerCase();

        return matchesSearch && matchesRole;
    });

    const handleRoleChange = (user) => {
        const isAdmin = user.role === 'admin';
        const newRole = isAdmin ? 'user' : 'admin';

        Swal.fire({
            title: isAdmin ? `Remove admin access from ${user.displayName}?` : `Make ${user.displayName} an admin?`,
            text: isAdmin
                ? "They'll lose access to admin-only pages and actions."
                : "They'll gain full access to admin-only pages and actions.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isAdmin ? '#DC2626' : '#7C3AED',
            cancelButtonColor: '#6B6478',
            confirmButtonText: isAdmin ? 'Remove admin' : 'Make admin',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`, { role: newRole }).then((res) => {
                    if (res.data.modifiedCount) {
                        refetch();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: isAdmin ? 'Admin access removed' : 'User is now an admin',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="space-y-2">
                    <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                        Users
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E1B2E]">
                        Manage Users
                        <span className="ml-2 text-[#7C3AED]">({users.length})</span>
                    </h1>
                    <p className="text-base md:text-lg text-[#6B6478] font-medium">
                        Search users and manage who has admin access.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6478]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        className="input input-lg w-full pl-10 text-base font-medium bg-white border-[#EDE9FE] focus:border-[#7C3AED] focus:outline-[#7C3AED]"
                    />
                </div>
            </div>

            {/* Role filter */}
            <div className="flex flex-wrap gap-2">
                {ROLE_FILTERS.map((role) => (
                    <button
                        key={role}
                        onClick={() => setRoleFilter(role)}
                        className={`px-5 py-2.5 rounded-full text-base font-bold transition-colors ${
                            roleFilter === role
                                ? 'bg-[#7C3AED] text-white'
                                : 'bg-white border border-[#EDE9FE] text-[#6B6478] hover:border-[#C4B5FD] hover:text-[#1E1B2E]'
                        }`}
                    >
                        {role}
                    </button>
                ))}
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-lg font-medium text-[#6B6478]">
                    Loading users...
                </div>
            )}

            {/* Empty state */}
            {!isLoading && filteredUsers.length === 0 && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]">
                        <Users className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1E1B2E]">
                        {search || roleFilter !== 'All' ? 'No users match your filters' : 'No users found'}
                    </h3>
                    <p className="text-base font-medium text-[#6B6478]">
                        {search || roleFilter !== 'All'
                            ? 'Try a different name, email, or role.'
                            : 'Users will show up here once they sign up.'}
                    </p>
                </div>
            )}

            {/* Users — desktop table */}
            {!isLoading && filteredUsers.length > 0 && (
                <div className="hidden md:block rounded-3xl border border-[#EDE9FE] bg-white overflow-hidden shadow-[0_4px_30px_rgba(124,58,237,0.08)]">
                    <table className="w-full text-base">
                        <thead>
                            <tr className="bg-[#FAF8FF] text-left text-[#6B6478] uppercase text-sm tracking-wide">
                                <th className="px-6 py-4 font-bold">User</th>
                                <th className="px-6 py-4 font-bold">Email</th>
                                <th className="px-6 py-4 font-bold">Joined</th>
                                <th className="px-6 py-4 font-bold">Role</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t border-[#EEEAF6] hover:bg-[#FAF8FF] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="h-10 w-10 rounded-full object-cover border border-[#EDE9FE]"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-[#F5F0FE] text-[#7C3AED] flex items-center justify-center font-bold text-base">
                                                    {user.displayName?.charAt(0)?.toUpperCase() || '?'}
                                                </div>
                                            )}
                                            <span className="font-bold text-[#1E1B2E]">
                                                {user.displayName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478] font-medium">{user.email}</td>
                                    <td className="px-6 py-4 text-[#6B6478] font-medium">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <CalendarDays className="h-4 w-4" />
                                            {formatDate(user.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] px-3 py-1.5 text-sm font-bold capitalize">
                                                <ShieldCheck className="h-4 w-4" />
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8FF] text-[#6B6478] px-3 py-1.5 text-sm font-bold capitalize">
                                                {user.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end">
                                            {user.role === 'admin' ? (
                                                <button
                                                    onClick={() => handleRoleChange(user)}
                                                    className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 text-sm font-bold"
                                                >
                                                    <ShieldOff className="h-4 w-4" />
                                                    Remove Admin
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRoleChange(user)}
                                                    className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#DCD3F5] px-4 py-2 text-sm font-bold"
                                                >
                                                    <ShieldCheck className="h-4 w-4" />
                                                    Make Admin
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Users — mobile cards */}
            {!isLoading && filteredUsers.length > 0 && (
                <div className="md:hidden space-y-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className="rounded-2xl border border-[#EDE9FE] bg-white p-5 space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName}
                                            className="h-11 w-11 rounded-full object-cover border border-[#EDE9FE]"
                                        />
                                    ) : (
                                        <div className="h-11 w-11 rounded-full bg-[#F5F0FE] text-[#7C3AED] flex items-center justify-center font-bold text-base">
                                            {user.displayName?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-lg font-bold text-[#1E1B2E]">{user.displayName}</div>
                                        <div className="text-sm font-medium text-[#6B6478]">{user.email}</div>
                                    </div>
                                </div>
                                {user.role === 'admin' ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] px-3 py-1.5 text-sm font-bold capitalize">
                                        <ShieldCheck className="h-4 w-4" />
                                        Admin
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8FF] text-[#6B6478] px-3 py-1.5 text-sm font-bold capitalize">
                                        {user.role}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#6B6478]">
                                <CalendarDays className="h-4 w-4" />
                                Joined {formatDate(user.createdAt)}
                            </div>

                            <div className="pt-3 border-t border-[#EEEAF6]">
                                {user.role === 'admin' ? (
                                    <button
                                        onClick={() => handleRoleChange(user)}
                                        className="w-full inline-flex items-center justify-center gap-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2.5 text-sm font-bold"
                                    >
                                        <ShieldOff className="h-4 w-4" />
                                        Remove Admin
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleRoleChange(user)}
                                        className="w-full inline-flex items-center justify-center gap-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#DCD3F5] px-3 py-2.5 text-sm font-bold"
                                    >
                                        <ShieldCheck className="h-4 w-4" />
                                        Make Admin
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageUsers;