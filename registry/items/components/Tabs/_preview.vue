<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from ".";
</script>

<template>
  <Tabs default-value="account" class="max-w-sm">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Make changes to your account here.</TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
</template>
