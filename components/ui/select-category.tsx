import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/categories";

interface Props {
  isLoading: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectCategory({ isLoading, value, onValueChange }: Props) {
  return (
    <Select disabled={isLoading} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="random">__Random Category__</SelectItem>
        {categories.map((category) => (
          <SelectItem value={category.name}>{category.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
