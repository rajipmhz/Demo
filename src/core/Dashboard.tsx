import { Link } from "react-router-dom";

const features = [
  {
    title: "Speech To Text",
    description:
      "Convert spoken audio into written text using speech recognition.",
    path: "/speech",
  },

  {
    title: "Text To Speech",
    description:
      "Convert written text into natural voice output.",
    path: "/text-to-speech",
  },

  {
    title: "Form",
    description:
      "Interactive form components with validation and accessibility.",
    path: "/form",
  },

  {
    title: "Image Overlay",
    description:
      "Upload images and apply overlays or annotations.",
    path: "/images",
  },

  {
    title: "Video Overlay",
    description:
      "Add overlays and controls to video content.",
    path: "/video",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Speech Toolkit Dashboard
          </h1>

          <p className="text-lg text-muted-foreground">
            Explore speech recognition, text-to-speech,
            image overlays, video tools, and more.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="border rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-card"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h2>

              <p className="text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-5 text-blue-500 font-medium">
                Open →
              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;