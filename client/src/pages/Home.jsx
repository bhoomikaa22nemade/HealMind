import { useEffect, useMemo, useState } from "react";
import { getCounsellors } from "../services/api.js";

import Hero from "../components/Hero";
import Stats from "../components/Stats";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import SortDropdown from "../components/SortDropdown";
import CounsellorCard from "../components/CounsellorCard";
import BookingModal from "../components/BookingModal";
import Testimonials from "../components/Testimonals";
import FAQ from "../components/FAQ";
import CallToAction from "../components/CallToAction";

export default function Home() {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [sort, setSort] = useState("");

  const [selectedCounsellor, setSelectedCounsellor] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const res = await getCounsellors({
          search: debouncedSearch,
          specialization,
          sort,
        });

        if (!cancelled) {
          setCounsellors(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            "Couldn't reach the server. Make sure the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, specialization, sort]);

  const resultsLabel = useMemo(() => {
    if (loading) return "Loading counsellors...";
    if (counsellors.length === 0) return "No counsellors found";

    return `Showing ${counsellors.length} counsellor${
      counsellors.length > 1 ? "s" : ""
    }`;
  }, [loading, counsellors]);

  return (
    <>
      <Hero />

      <Stats />

      <WhyChoose />

      <HowItWorks />

      <section id="our-counsellors" className="container">

     <div className="section-title">
  <span>OUR COUNSELLORS</span>

  <h2>Find the Right Counsellor for You</h2>

  <p>
    Browse verified professionals based on their specialization,
    experience, ratings, and availability.
  </p>
</div>

        <div className="controls">
          <SearchBar value={search} onChange={setSearch} />

          <FilterButtons
            active={specialization}
            onChange={setSpecialization}
          />

          <SortDropdown
            value={sort}
            onChange={setSort}
          />
        </div>

        <p className="results-meta">{resultsLabel}</p>

        {loading && (
          <div className="state-block">
            <div className="spinner"></div>
            <p>Fetching counsellors...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-block">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && counsellors.length === 0 && (
          <div className="state-block">
            <h3>No Counsellors Found</h3>
            <p>Try changing the search or filters.</p>
          </div>
        )}

        {!loading && !error && counsellors.length > 0 && (
          <div className="counsellor-grid">
            {counsellors.map((counsellor) => (
              <CounsellorCard
                key={counsellor.id}
                counsellor={counsellor}
                onBook={setSelectedCounsellor}
              />
            ))}
          </div>
        )}
      </section>

      <Testimonials />

      <FAQ />

      <CallToAction />

      {selectedCounsellor && (
        <BookingModal
          counsellor={selectedCounsellor}
          onClose={() => setSelectedCounsellor(null)}
        />
      )}
    </>
  );
}