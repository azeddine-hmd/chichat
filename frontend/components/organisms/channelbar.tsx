import { useState } from "react";
import Hr from "../atoms/hr";
import UserSection from "../molecules/user-section";
import DisabledSearchField from "../molecules/disabled-search-field";
import PrimaryButton from "../molecules/primary-button";

function DefaultContentChannel() {
  return (
    <PrimaryButton className="h-[42px]" onClick={(_) => {}} >
      Friends
    </PrimaryButton>
  );
}

type ContentChannelType = "default";

function ContentChannel() {
  const [contentChannelType, setContentChannelType] = useState<ContentChannelType>("default");

  return (
    <div className="ml-2 mr-2 mt-2 h-full overflow-y-scroll">
      {contentChannelType === "default" && <DefaultContentChannel />}
    </div>
  );
}

export default function Channelbar() {
  return (
    <nav className="flex h-full w-[240px] shrink-0 grow-0 flex-col bg-gray-700 shadow-lg">
      <DisabledSearchField />
      <Hr className="w-full border-gray-850"></Hr>
      <ContentChannel />
      <UserSection />
    </nav>
  );
}
