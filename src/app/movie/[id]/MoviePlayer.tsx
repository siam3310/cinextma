import { Card, Tabs, Tab } from "@nextui-org/react";

const MoviePlayer: React.FC<{ id?: number }> = ({ id }) => {
  return (
    <Tabs size="lg" aria-label="Movie Player" placement="bottom" color="primary" className="z-[3]" classNames={{ base: "flex justify-center" }}>
      <Tab key="server1" title="Server 1">
        <Card shadow="md">
          <iframe className="aspect-video h-full w-full" src={`https://vidsrc.xyz/embed/movie/${id}`} frameBorder={0} allowFullScreen />
        </Card>
      </Tab>
      <Tab key="server2" title="Server 2">
        <Card shadow="md">
          <iframe className="aspect-video h-full w-full" src={`https://vidsrc.to/embed/movie/${id}`} frameBorder={0} allowFullScreen />
        </Card>
      </Tab>
    </Tabs>
  );
};

export default MoviePlayer;
