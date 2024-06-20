import { Form, InputField, CheckboxField, FormField } from "@/components/Form";
import { Button } from "@/components/Elements";

import { Project } from "../..";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { projectFilterAtom } from "./atom";

export type ProjectFilterDTO = {
  project_name: string;
  client_name: string;
  min_delivery_schedule_date: string;
  max_delivery_schedule_date: string;
  is_delivered: boolean;
  is_invoiced: boolean;
};

export const useProjectFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(projectFilterAtom);

  const filterTerms = {
    project_name: (target: Project) => {
      return target.project_name.match(filterValue.project_name);
    },
    client_name: (target: Project) => {
      return target.client_name.match(filterValue.client_name);
    },
    min_delivery_schedule_date: (target: Project) => {
      if (!filterValue.min_delivery_schedule_date) return true;
      return (
        dayjs(target.delivery_schedule_date) >
        dayjs(filterValue.min_delivery_schedule_date)
      );
    },
    max_delivery_schedule_date: (target: Project) => {
      if (!filterValue.max_delivery_schedule_date) return true;
      return (
        dayjs(target.delivery_schedule_date) <
        dayjs(filterValue.max_delivery_schedule_date)
      );
    },
    is_delivered: (target: Project) => {
      if (!filterValue.is_delivered) return true;
      return target.delivery_issued_date ? true : false;
    },
    is_invoiced: (target: Project) => {
      if (!filterValue.is_invoiced) return true;
      return target.invoice_issued_date ? true : false;
    },
  };

  const FilterForm = () => {
    return (
      <Form<ProjectFilterDTO>
        id="filter-project"
        options={{ defaultValues: filterValue }}
        onSubmit={(d) => setFilterValue(d)}
      >
        {({ control }) => (
          <>
            <div className="flex gap-6">
              <FormField
                control={control}
                name="project_name"
                render={({ field }) => <InputField label="案件名" {...field} />}
              />
              <FormField
                control={control}
                name="client_name"
                render={({ field }) => (
                  <InputField label="取引先名" {...field} />
                )}
              />
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-end gap-4">
                <FormField
                  control={control}
                  name="min_delivery_schedule_date"
                  render={({ field }) => (
                    <InputField label="納品予定日" type="date" {...field} />
                  )}
                />
                <div className="pb-2">~</div>
                <FormField
                  control={control}
                  name="max_delivery_schedule_date"
                  render={({ field }) => <InputField type="date" {...field} />}
                />
              </div>
              <FormField
                control={control}
                name="is_delivered"
                render={({ field }) => (
                  <CheckboxField label="納品済み" {...field} />
                )}
              />
              <FormField
                control={control}
                name="is_invoiced"
                render={({ field }) => (
                  <CheckboxField label="請求済み" {...field} />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-fit">
                検索
              </Button>
            </div>
          </>
        )}
      </Form>
    );
  };

  return { filterValue, FilterForm, filterTerms };
};
