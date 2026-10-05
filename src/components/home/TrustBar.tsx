import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Award, Cpu } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">ضمانت اصالت قطعات</h5>
              <p className="text-[10px] text-slate-400">کالای اورجینال با پلمپ کارخانه</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">گارانتی طلایی ۲۴ ماهه</h5>
              <p className="text-[10px] text-slate-400">پوشش کامل قطعات و باتری</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">ارسال اکسپرس امن</h5>
              <p className="text-[10px] text-slate-400">تحویل ۲ ساعته در تهران</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">۷ روز مهلت تست فنی</h5>
              <p className="text-[10px] text-slate-400">تست کامل استرس و بنچمارک</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">کاستومایز و ارتقاء</h5>
              <p className="text-[10px] text-slate-400">ارتقاء رم و SSD با قطعات اورجینال</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">مشاوره تخصصی سخت‌افزار</h5>
              <p className="text-[10px] text-slate-400">پاسخگویی ۲۴ ساعته متخصصان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
