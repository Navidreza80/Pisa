import { ReactNode } from "react";

export default interface FeaturesProps {
  icon: ReactNode;
  desc: string;
  title: string;
}

export default interface AboutUsInputProps {
  id: string;
  placeholder: string;
  title: string;
  type: string;
}

export default interface ProfileProps {
  profile: string;
  name: string;
  job: string;
}

export default interface QuestionProps {
  title: string;
  desc: string;
}
