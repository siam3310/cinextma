"use client";

import { AppendToResponse, Movie, MovieDetails, ReviewDetails } from "tmdb-ts/dist/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import RelatedMovieList from "./RelatedMovieList";

const ReviewsSection: React.FC<{ reviews: ReviewDetails }> = ({ reviews }) => {
  return <section id="reviews" className="z-[3]"></section>;
};

export default ReviewsSection;
