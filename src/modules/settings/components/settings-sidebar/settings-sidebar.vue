<template>
  <Sidebar class="mt-13">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <template v-for="item of items" :key="item.title">
              <template v-if="!item.subItems">
                <SidebarMenuButton as-child :is-active="item.title === 'Home'">
                  <a :href="item.url">
                    {{ item.title }}
                  </a>
                </SidebarMenuButton>
              </template>
              <template v-else>
                <Collapsible default-open classs="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton
                        as-child
                        :is-active="item.title === 'Home'"
                      >
                        <a :href="item.url">
                          {{ item.title }}
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub> Hello world </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </template>
            </template>
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
  SidebarMenuSubItem,
  SidebarMenuSub,
} from '@/modules/common/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/modules/common/components/ui/collapsible';

const items = [
  {
    title: 'Home',
    url: '#common-settings',
  },
  {
    title: 'Inbox',
    url: '#editor-settings',
    subItems: [],
  },
  {
    title: 'Calendar',
    url: '#ai-settings',
  },
];
</script>
