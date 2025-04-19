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
                <Collapsible
                  default-open
                  classs="group/collapsible"
                  v-slot="{ open }"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuButton
                        as-child
                        :is-active="item.title === 'Home'"
                      >
                        <a :href="item.url" class="flex">
                          {{ item.title }}
                          <ChevronRight
                            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                            :class="{
                              'rotate-90': open,
                              'rotate-0': !open,
                            }"
                          />
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub
                        v-for="subItem of item.subItems"
                        :key="subItem.title"
                      >
                        <SidebarMenuSubItem>
                          <SidebarMenuButton
                            as-child
                            :is-active="subItem.title === 'Home'"
                          >
                            <a :href="subItem.url">
                              {{ subItem.title }}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
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
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
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
    title: 'Common',
    url: '#common-settings',
  },
  {
    title: 'Editor',
    url: '#editor-settings',
    subItems: [
      {
        title: 'Formatter',
        url: '#',
      },
    ],
  },
  {
    title: 'IA',
    url: '#ai-settings',
  },
];
</script>
