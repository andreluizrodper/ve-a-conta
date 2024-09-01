<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <AccountAvatar v-if="account" :id="account.id" />
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="account" align="end">
      <DropdownMenuLabel>{{ greeting }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <ToggleTheme />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel v-if="restaurants.lenght > 0"
        >Seus restaurantes</DropdownMenuLabel
      >
      <DropdownMenuItem
        v-for="item in restaurants"
        :key="item.id"
        :disabled="item.id === restaurant.id"
      >
        <div class="flex gap-2 items-center">
          <span class="w-4 flex items-center justify-center">
            <Check size="14" v-if="item.id === restaurant.id" />
          </span>
          {{ item.name }}
          <span
            v-if="restaurant.isOpen"
            class="size-2 bg-green-400 animate-pulse rounded-full"
          />
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logOut">
        <LogOut size="16" class="mr-2" />
        Sair
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script>
import { Check, LoaderCircle } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-vue-next";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import AccountAvatar from "@/components/ui/account-avatar.vue";
import ToggleTheme from "@/components/dashboard/ui/toggle-theme.vue";

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
    greeting() {
      if (this.account.name.length === 0) return "Oi! Tudo bem?";
      return this.account.name;
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
    restaurant() {
      return this.$store.state.restaurant;
    },
  },
  components: {
    Check,
    AccountAvatar,
    LoaderCircle,
    LogOut,
    ToggleTheme,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Avatar,
    AvatarFallback,
  },
  methods: {
    logOut() {
      signOut(auth).then(() => {
        this.$store.commit("setAccount", null);
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>
