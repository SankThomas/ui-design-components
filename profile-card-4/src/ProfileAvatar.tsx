import { Smile } from "lucide-react";
import { useState } from "react";

export default function ProfileAvatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="avatar-frame">
      {failed ? (
        <div className="avatar-fallback" aria-label="Profile image unavailable">
          <Smile aria-hidden="true" />
        </div>
      ) : (
        <img
          className="avatar-image"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&h=320&q=85"
          alt="Profile portrait"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
