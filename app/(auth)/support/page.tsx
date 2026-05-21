import { Logo } from "@/app/ui/Icons";

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
            ご質問や不具合などございましたら、以下のメールアドレスまで
            お気軽にお問い合わせください。
          </p>

          <a
            href="mailto:support@kenchiku.ai"
            className="inline-block mt-6 text-blue-600 hover:text-blue-800 underline"
          >
            support@kenchiku.ai
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
