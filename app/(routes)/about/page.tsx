import AboutBillboard from "@/components/about/AboutBillboard";
import CareSection from "@/components/about/CareSection";
import ImpactSection from "@/components/about/ImpactSection";
import JoinFamily from "@/components/about/JoinFamily";
import MissionSection from "@/components/about/MissionSection";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import WhyFusionSection from "@/components/about/WhyFusionSection";
function AboutPage() {
  return (
    <>
      <AboutBillboard></AboutBillboard>
      <div className="my-12 space-y-16">
        <StorySection></StorySection>
        <MissionSection></MissionSection>
        <ValuesSection></ValuesSection>
        <WhyFusionSection></WhyFusionSection>
        <CareSection></CareSection>
        <ImpactSection></ImpactSection>
        <JoinFamily></JoinFamily>
      </div>
    </>
  );
}
export default AboutPage;
