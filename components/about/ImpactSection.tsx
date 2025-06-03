import Container from "../global/Container";

function ImpactSection() {
  return (
    <div className="bg-secondary py-8">
      <Container className="space-y-4 mx-auto max-w-[650px] text-center">
        <h2 className="text-3xl font-semibold ">Our Community & Impact</h2>
        <p>
          FusionFootwear isn’t just a brand—it’s a community of enthusiasts who
          believe in exploration, sustainability, and personal expression. We
          partner with local artists, collaborate with a network of global
          runners and hikers for product testing, and sponsor community clean-up
          events in urban neighborhoods. Every season, a percentage of proceeds
          is donated to organizations focused on environmental conservation and
          providing footwear to communities in need.
        </p>
        <p>
          We host monthly “Step & Share” events—virtual and in-person gatherings
          where runners, fashion-lovers, and outdoor adventurers can connect,
          share stories, and test new prototypes. Our social media channels
          feature real-life “Fusion Footprints” from customers worldwide: from
          scenic trails in Colorado to bustling markets in Tokyo, our shoes are
          there, helping people move comfortably through life’s moments.
        </p>
      </Container>
    </div>
  );
}
export default ImpactSection;
