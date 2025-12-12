import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Decorators = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleDecoratorApplication = async (data) => {
        try {
            // Add extra fields
            const decoratorData = {
                ...data,
                status: 'pending',
                createdAt: new Date(),
                email: user?.email || 'anonymous',
            };

            const res = await axiosSecure.post('/decorators', decoratorData);
            if (res.data.insertedId) {
                toast.success('Decorator application submitted successfully!');
                reset();
            }
        } catch (error) {
            console.error(error);
            alert('Failed to submit decorator');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#1E595D]">
                Add Your Decorator Profile
            </h2>

            <form onSubmit={handleSubmit(handleDecoratorApplication)} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.name && <span className="text-red-500">Name is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Specialty</label>
                    <input
                        type="text"
                        {...register('specialty', { required: true })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.specialty && <span className="text-red-500">Specialty is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Rating (0-5)</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...register('rating', { required: true, min: 0, max: 5 })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.rating && <span className="text-red-500">Rating between 0-5 required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Number of Reviews</label>
                    <input
                        type="number"
                        {...register('reviews', { required: true, min: 0 })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.reviews && <span className="text-red-500">Valid review count required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input
                        type="url"
                        {...register('image', { required: true })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.image && <span className="text-red-500">Image URL is required</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#C8A870] text-[#1E595D] font-semibold py-2 rounded hover:opacity-90 transition"
                >
                    Submit Decorator
                </button>
            </form>
        </div>
    );
};

export default Decorators;



