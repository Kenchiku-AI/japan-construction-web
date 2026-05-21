import { Logo } from "@/app/ui/Icons";
import { buttonColor } from "@/lib/constants";

const Support = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex justify-center mt-8">
          <Logo />
        </div>

        <div className="mt-12 text-center text-gray-700">
          <h1 className="text-2xl font-semibold mb-4">サポート</h1>

          <p className="text-lg leading-relaxed">
            ご質問や不具合などございましたら、
            <br />
            以下のメールアドレスまでお気軽にお問い合わせください。
          </p>

          <a
            href="mailto:support@kenchiku.ai"
            className="inline-block mt-6 underline"
            style={{ color: buttonColor }}
          >
            support@kenchiku.ai
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
