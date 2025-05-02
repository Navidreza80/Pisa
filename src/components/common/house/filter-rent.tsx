"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { locationOptions, propertyOptions, transactionTypeOptions } from "@/utils/constant/folder";
import {
    useAppDispatch,
    useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setRentFilters } from "@/utils/hooks/react-redux/store/slices/rent-slice";
import InputSelect from "../inputs/select-input";
import InputText from "../inputs/text-inputs";

export function FilterModal() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.rentFilters);


  const handleChange = (name: string, value: any) => {
    dispatch(setRentFilters({ [name]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`flex items-center hover:bg-[#4A5FE3] whitespace-nowrap justify-center overflow-hidden transition-all text-white h-12 w-[85px] text-[16px] rounded-2xl`}
        >
          فیلتر ها
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="lg:!max-w-[1184px] md:!max-w-[700px] !max-w-[400px]">
        <DialogHeader><DialogTitle></DialogTitle></DialogHeader>

        <div className="flex flex-wrap justify-between gap-6">
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                محل مورد نظر
            </label>
            <InputSelect
              items={locationOptions}
              value={filters.search || ''}
              onChange={(value) => handleChange('search', value)}
              width={262}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                نوع ملک
            </label>
            <InputSelect
              items={propertyOptions}
              value={filters.propertyType || ''}
              onChange={(value) => handleChange('propertyType', value)}
              width={262}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
             نوع معامله 
            </label>
            <InputSelect
              items={transactionTypeOptions}
              value={filters.transactionType || ''}
              onChange={(value) => handleChange('transactionType', value)}
              width={262}
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                نوع معامله
            </label>
            <InputSelect
              items={locationOptions}
              value={filters.search || ''}
              onChange={(value) => handleChange('search', value)}
              width={262}
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                حداقل اجاره
            </label>
            <InputText
              value={filters.minRent || ''}
              onChange={(e) => handleChange('minRent', e.target.value)}
              width="w-[262px]"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                حداکثر اجاره
            </label>
            <InputText
              value={filters.maxRent || ''}
              onChange={(e) => handleChange('maxRent', e.target.value)}
              width="w-[262px]"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                حداقل متراژ
            </label>
            <InputText
              value={filters.minArea || ''}
              onChange={(e) => handleChange('minArea', e.target.value)}
              width="w-[262px]"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
                حداکثر متراژ
            </label>
            <InputText
              value={filters.maxArea || ''}
              onChange={(e) => handleChange('maxArea', e.target.value)}
              width="w-[262px]"
              dir="rtl"
            />
          </div>
          


          <div className="flex justify-end gap-2 pt-4">
            <Button className="text-white" onClick={() => dispatch(resetReserveFilters())}>
              حذف فیلترها
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
