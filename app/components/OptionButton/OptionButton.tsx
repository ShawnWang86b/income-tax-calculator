import { FormItem, FormLabel } from "@/components/ui/form";

type Props = {
  options: string[];
  optionsText: string[];
  activeOption: string;
  setFunction: any;
  label?: string;
};
const OptionButton = ({
  options,
  optionsText,
  activeOption,
  setFunction,
  label,
}: Props) => {
  const activeClassName =
    "px-2 cursor-pointer rounded-md bg-themePrimaryHover flex justify-center pt-1 xl:pt-2.5";
  const inactiveClassName =
    "px-2 cursor-pointer rounded-md hover:bg-themePrimaryHover flex justify-center pt-1 xl:pt-2.5";

  const getButtonClass = (option: string) => {
    return option === activeOption ? activeClassName : inactiveClassName;
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="grid grid-rows-3 xl:grid-rows-1 xl:grid-flow-col w-[100%] xl:w-[120%] h-[90px] xl:h-[44px] xl:text-sm rounded-md bg-themePrimary text-white border-slate-200 border-[1px]">
        {options.map((option: string, index: number) => (
          <div
            key={index}
            className={getButtonClass(option)}
            onClick={() => setFunction(option)}
          >
            {optionsText[index]}
          </div>
        ))}
      </div>
    </FormItem>
  );
};

export default OptionButton;
