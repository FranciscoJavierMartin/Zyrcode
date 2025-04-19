<template>
  <Sidebar class="mt-13">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item of items" :key="item.title">
              <SidebarMenuButton as-child :is-active="item.title === 'Home'">
                <a :href="item.url">
                  {{ item.title }}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/modules/common/components/ui/sidebar';

const items = [
  {
    title: 'Home',
    url: '#common-settings',
  },
  {
    title: 'Inbox',
    url: '#editor-settings',
  },
  {
    title: 'Calendar',
    url: '#ai-settings',
  },
];
</script>
