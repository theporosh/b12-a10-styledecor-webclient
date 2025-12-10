import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Loading from "../Shared/Loading/Loading";

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("asc");
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // debounce for search
    const searchRef = useRef();
    useEffect(() => {
        clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            setPage(1);
            fetchPackages(1);
        }, 450);
        return () => clearTimeout(searchRef.current);

    }, [search]);

    // fetch categories on mount
    useEffect(() => {
        axios
            .get("http://localhost:3000/categories")
            .then((res) => {
                if (res.data && Array.isArray(res.data)) {
                    setCategories(["All", ...res.data]);
                }
            })
            .catch((err) => {
                console.error("Failed to load categories", err);
            });
    }, []);

    // fetch on filter/sort/page change
    useEffect(() => {
        fetchPackages(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, minPrice, maxPrice, sort, page]);

    const fetchPackages = async (pageToLoad = 1) => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                search: search || undefined,
                category: category && category !== "All" ? category : undefined,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
                sort,
                page: pageToLoad,
                limit,
            };

            // const res = await axios.get("/public/allServices.json", { params });
            const res = await axios.get("http://localhost:3000/services", { params });
            if (res.data) {
                setServices(res.data.data || []);
                setTotalPages(res.data.totalPages || 1);
                setTotalResults(res.data.total || 0);
            }
        } catch (err) {
            console.error("Fetch packages error:", err);
            setError("Failed to load services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchPackages(1);
    };

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setMinPrice("");
        setMaxPrice("");
        setSort("asc");
        setPage(1);
    };

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-3xl font-bold text-[#1E595D]">
                        Our <span className="text-[#C8A870]">Services</span>
                    </h2>

                    {/* Search + Filters */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-col sm:flex-row gap-3 items-stretch md:items-center"
                    >
                        <div className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search service name..."
                                className="pl-10 pr-4 py-2 rounded-lg border w-72 focus:outline-none focus:ring-2 focus:ring-[#C8A870]"
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="py-2 px-3 rounded-lg border focus:outline-none"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min price"
                            className="py-2 px-3 rounded-lg border w-28 focus:outline-none"
                        />
                        <input
                            type="number"
                            min="0"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max price"
                            className="py-2 px-3 rounded-lg border w-28 focus:outline-none"
                        />

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="py-2 px-3 rounded-lg border focus:outline-none"
                        >
                            <option value="asc">Price: Low → High</option>
                            <option value="desc">Price: High → Low</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="bg-[#1E595D] text-white px-4 py-2 rounded-lg"
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-4 py-2 rounded-lg border"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Summary */}
                <div className="mt-6 text-sm text-gray-600">
                    {loading ? (
                        <span className="loading loading-spinner text-primary"></span>
                    ) : (
                        <span>
                            Showing <strong>{services.length}</strong> of <strong>{totalResults}</strong> services
                        </span>
                    )}
                </div>

                {/* Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading && (
                        <>
                            {Array.from({ length: limit }).map((_, idx) => (
                                <div key={idx} className="animate-pulse bg-white rounded-xl h-64" />
                            ))}
                        </>
                    )}

                    {!loading && services.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            No services found for your filters.
                        </div>
                    )}

                    {!loading &&
                        services.map((s, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <img
                                    src={s.image}
                                    alt={s.title}
                                    className="w-full h-44 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{s.category} • {s.duration}</p>
                                    <p className="text-gray-600 mt-3 line-clamp-3">{s.description}</p>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xl font-bold text-[#1E595D]">৳ {s.price}</span>
                                        <button className="px-4 py-2 bg-[#C8A870] text-[#1E595D] rounded-lg font-semibold hover:opacity-90">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-2 rounded-lg border disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <div>
                        Page <strong>{page}</strong> / <strong>{totalPages}</strong>
                    </div>

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-2 rounded-lg border disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AllServices;
