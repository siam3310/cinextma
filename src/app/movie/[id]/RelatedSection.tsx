"use client";

import { AppendToResponse, Movie, MovieDetails } from "tmdb-ts/dist/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import RelatedMovieList from "./RelatedMovieList";

const RelatedSection: React.FC<{ movie: AppendToResponse<MovieDetails, ("recommendations" | "similar")[], "movie"> }> = ({ movie }) => {
  return (
    <section id="related" className="z-[3]">
      <Tabs aria-label="Related Section" variant="underlined">
        <Tab key="recommendations" title="Recommendations">
          <RelatedMovieList movies={movie?.recommendations.results as Movie[]} />
        </Tab>
        <Tab key="similar" title="Similar">
          <RelatedMovieList movies={movie?.similar.results as Movie[]} />
        </Tab>
      </Tabs>
    </section>
  );
};

export default RelatedSection;
