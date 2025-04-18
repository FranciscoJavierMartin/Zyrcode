<template>
  <FormField v-slot="{ componentField }" name="model">
    <FormItem>
      <FormLabel>Email</FormLabel>
      <Select v-bind="componentField" id="model">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="hello"> Hello </SelectItem>
            <SelectItem value="world"> World </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription> Select your model. </FormDescription>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/modules/common/components/ui/form';
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectItem,
} from '@/modules/common/components/ui/select';
</script>
