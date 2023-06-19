import AvatarSection from "../molecules/avatar-section";
import DisabledSearchField from "../molecules/disabled-search-field";

export default function Channelbar() {
  return (
    <nav className="flex flex-col min-h-screen w-60 bg-gray-700 shadow-lg">
        <DisabledSearchField />
        <div className="bg-gray-700 w-full flex-grow" ></div> {/* Channel Section */}
        <AvatarSection />
    </nav>
  );
}
